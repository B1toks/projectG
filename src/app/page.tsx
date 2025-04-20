import Default_button from '../components/button';

export default function Home() {
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center flex-col gap-8 text-foreground">
      <div className="flex items-center justify-center">
        <h1 className="text-3xl font-bold text-black sm:text-2xl md:text-3xl lg:text-4xl dark:text-white">
          Tailwind працює
        </h1>
      </div>
      <div className="bg-yellow-500 w-full">
        <Default_button />
      </div>
    </div>
  );
}
