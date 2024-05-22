import dynamic from "next/dynamic";
const Map1 = dynamic(() => import('./Map1'), {
    ssr: false, // Disable server-side rendering
  });
   
  export default Map1;
