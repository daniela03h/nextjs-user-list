import { NextResponse } from "next/server";

let users = [
  {
    id: Date.now(),
    name: "John Doe",
    email: "john.doe@example.com",
    age: 30,
  },
];

export async function GET() {
  return NextResponse.json(users, { status: 200 });
}

export async function POST(request: Request) {
  const user = await request.json();

  const newUser = {
    id: Date.now(),
    name: user.name,
    email: user.email,
    age: user.age,
  }

  users.push(newUser);
  return NextResponse.json(newUser, { status: 201 });
}

export async function DELETE(request: Request) {
  const userId = await request.json();
  users = users.filter(user => user.id !== userId)
  return NextResponse.json(users, { status: 200 });
}