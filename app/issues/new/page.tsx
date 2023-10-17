// app/issues/new/page.tsx

import dynamic from "next/dynamic";
import IssueFormSkeleton from "../_components/IssueFormSkeleton";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  // loading: ()=> <p>Loading...</p>
  loading: () => <IssueFormSkeleton />,
});

const NewIssuePage = () => {
  return <IssueForm />;
};

export default NewIssuePage;
