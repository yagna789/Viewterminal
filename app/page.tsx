import dynamic from 'next/dynamic';
import Sample from '@/components/ui/Sample';
const Map1 = dynamic(() => import('@/components/ui/Map1'), {
  ssr: false,
});




export default function Home() {
  return (
    <main className="absolute top-0 left-0 w-full h-full ">
      <Sample/>
     
    </main>
  )
}
