import { ComputerDesktopIcon } from '@heroicons/react/24/outline';
import { lusitana } from './fonts';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex items-center leading-none text-white`}
    >
      <ComputerDesktopIcon className="h-12 w-12" />
      <p className="text-[44px]">Acme</p>
    </div>
  );
}
