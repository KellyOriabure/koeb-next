import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const products = await sql`SELECT * FROM products ORDER BY created_at DESC`;
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, category, price, sku, stock, image_url } = body;

    if (!title) {
      return NextResponse.json(
        { error: "Product title is required" },
        { status: 400 }
      );
    }

    const parsedPrice = price ? parseFloat(price) : null;
    const parsedStock = stock ? parseInt(stock, 10) : 0;

    const result = await sql`
      INSERT INTO products (title, description, category, price, sku, stock, image_url)
      VALUES (${title}, ${description || null}, ${category || null}, ${parsedPrice}, ${sku || null}, ${parsedStock}, ${image_url || null})
      RETURNING *
    `;

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, description, category, price, sku, stock, image_url } = body;

    if (!id || !title) {
      return NextResponse.json(
        { error: "Product ID and title are required" },
        { status: 400 }
      );
    }

    const parsedPrice = price ? parseFloat(price) : null;
    const parsedStock = stock ? parseInt(stock, 10) : 0;

    const result = await sql`
      UPDATE products
      SET title = ${title},
          description = ${description || null},
          category = ${category || null},
          price = ${parsedPrice},
          sku = ${sku || null},
          stock = ${parsedStock},
          image_url = ${image_url || null},
          updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `;

    if (result.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    await sql`DELETE FROM products WHERE id = ${id}`;
    return NextResponse.json({ message: "Product deleted" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
