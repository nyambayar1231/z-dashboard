'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export type State = {
  errors?: {
    name?: string[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  id: z.string(),
  name: z.string({
    required_error: 'Нэр оруулна уу',
  }),
  status: z.string(),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({
  id: true,
  date: true,
});

export async function createCategory(prevState: State, formData: FormData) {
  const validatedFields = CreateInvoice.safeParse({
    name: formData.get('name'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Category.',
    };
  }

  const { name, status } = validatedFields.data;

  const date = new Date().toISOString().split('T')[0];

  const created_by = '410544b2-4001-4271-9855-fec4b6a6442a';

  const isActive = status === 'active' ? true : false;

  try {
    await sql`
    INSERT INTO categories ( name, date, created_by, is_active)
    VALUES (${name}, ${date}, ${created_by}, ${isActive})
  `;
  } catch (error) {
    console.error(error);
    return {
      message: 'Database Error: Failed to Create Category',
    };
  }
  revalidatePath('/dashboard/categories');
  redirect('/dashboard/categories');
}

export async function deleteCategory(id: string) {
  try {
    await sql`DELETE FROM categories WHERE id = ${id}`;
    revalidatePath('/dashboard/categories');
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Category' };
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}
