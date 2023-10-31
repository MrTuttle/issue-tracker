//app/page.tsx

import Image from "next/image";
import Pagination from "./components/Pagination";

export default function Home() {
  return (
    <>
      <Pagination itemCount={100} pageSize={5} currentPage={20}></Pagination>
      <div>Home page</div>
    </>
  );
}
