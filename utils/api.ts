import axios from 'axios';
import { Job } from './types';

const API_URL = 'https://testapi.getlokalapp.com/common/jobs';

export const fetchJobs = async (page: number, limit: number): Promise<Job[]> => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        page,
        limit,
      },
      timeout: 15000,
    });

    if (!response.data || !Array.isArray(response.data.results)) {
      throw new Error('Invalid API response format');
    }

    return response.data.results.map((job: any) => ({
      id: job.id?.toString() || Math.random().toString(),
      title: job.title || 'No title available',
      primary_details: {
        Place: job.primary_details?.Place || 'Not specified',
        Salary: job.primary_details?.Salary || 'Not specified',
        Experience: job.primary_details?.Experience || 'Not specified',
      },
      content: job.content || '',
    }));
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to fetch jobs. Please try again later.');
  }
};