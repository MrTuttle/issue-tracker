// app/issue/page.tsx

import prisma from "@/prisma/client";
// delay to see skeletons and loadings
import { Status } from "@prisma/client";
import Pagination from "../components/Pagination";
import IssueActions from "./IssueActions";
import IssueTable, { IssueQuery, columnNames } from "./IssueTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";

interface Props {
  searchParams: IssueQuery;
}

const issuesPage = async ({ searchParams }: Props) => {
  // console.log(searchParams.status);

  // await delay(1000);

  // store statuses
  const statuses = Object.values(Status);
  // console.log("my statuses :" + statuses);

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const where = { status };

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />

      <Pagination
        itemCount={issueCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </Flex>
  );
};
// whats this ????
export const dynamic = "force-dynamic";

// metadata
export const metadata: Metadata = {
  // add also open graph and twitter properties
  title: "Issue Tracker - Issue list",
  description: "View all project issues",
};

export default issuesPage;
