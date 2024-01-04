import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function CategoryStatus({ isActive }: { isActive: boolean }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-500': isActive === false,
          'bg-green-500 text-white': isActive === true,
        }
      )}
    >
      {isActive === false ? (
        <>
          Идэвхигүй
          <ClockIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {isActive === true ? (
        <>
          Идэвхитэй
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
