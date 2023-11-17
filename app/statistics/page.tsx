"use client";

import { useEffect, useState } from "react";
import { IGlobalStatistic, IFrequentTags } from "@ts/interface/statistic";

const Statistics = () => {
  const [statisticsData, setStatisticsData] = useState({} as IGlobalStatistic);

  useEffect(() => {
    const fetchStatistics = async (): Promise<void> => {
      const response = await fetch(`/api/statistics/global`, {
        method: "GET"
      });

      const data = await response.json();

      setStatisticsData(data);
    }

    fetchStatistics();
  }, []);

  return (
    <div className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">
          Statistics
        </span>
      </h1>

      <div className="mt-4 block max-w-sm bg-gray-100 border border-gray-200 rounded-lg shadow hover:bg-gray-100">
        <dl className="flex flex-center gap-6 p-2 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-6 sm:p-8">
          <div className="flex flex-col items-center justify-center">
            <dt className="mb-2 text-3xl font-extrabold">{ statisticsData.total_posts }</dt>
            <dd className="text-gray-500 dark:text-gray-400">Total posts</dd>
          </div>
          <div className="flex flex-col items-center justify-center">
            <dt className="mb-2 text-3xl font-extrabold">{ statisticsData.total_users }</dt>
            <dd className="text-gray-500 dark:text-gray-400">Total users</dd>
          </div>
        </dl>
      </div>


      <h2 className="mb-2 mt-8 text-lg font-semibold text-gray-900">Top tags:</h2>
      <ol className="max-w-md space-y-1 text-gray-500 list-decimal list-inside">
        { statisticsData.frequent_tags.map((tag: IFrequentTags ) => (
            <li key={tag._id}>
              <span className="font-semibold text-gray-900 mr-1.5">
                {tag.tag_name}
              </span>
              in
              <span className="font-semibold text-gray-900 mx-1.5">
                {tag.count}
              </span>
              post(s)
            </li>
          )
        )}
      </ol>

    </div>
  )
}

export default Statistics;
