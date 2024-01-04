import Breadcrumbs from '@/app/ui/categories/breadcrumbs';
import Form from '@/app/ui/categories/create-form';

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Ангилалууд', href: '/dashboard/categories' },
          {
            label: 'Ангилал үүсгэх',
            href: '/dashboard/categories/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
