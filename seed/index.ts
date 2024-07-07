import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

const mongoUri = process.env.MONGO_URI;

@Schema({ _id: false })
class Category {
  @Prop({ required: true, index: true })
  name: string;
  @Prop({})
  description: string;
}

const CategorySchema = SchemaFactory.createForClass(Category);

@Schema({ collection: 'products' })
class Product {
  @Prop({ required: true, index: true })
  name: string;
  @Prop({ required: true, index: true })
  price: number;
  @Prop({
    type: Category,
    required: true,
    index: true,
    schema: CategorySchema,
  })
  category: Category;
}

const ProductSchema = SchemaFactory.createForClass(Product);

const ProductModel = mongoose.model('Products', ProductSchema);

async function seed() {
  try {
    await mongoose.connect(mongoUri);

    const products: Product[] = [
      {
        name: 'Camisa',
        price: 100,
        category: { name: 'roupa', description: 'roupa' },
      },
      {
        name: 'placa de memória',
        price: 200,
        category: { name: 'eletrônico', description: 'eletrônico' },
      },
    ];

    await ProductModel.insertMany(products);

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
