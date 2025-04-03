// app/types.ts
export interface Job {
    id: string;
    title: string;
    primary_details: {
      Place: string;
      Salary: string;
      Experience: string;
    };
    content: string;
    uniqueKey?: string;
  }