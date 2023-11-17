export interface IGlobalStatistic {
  total_users: number;
  total_posts: number;
  frequent_tags: Array<IFrequentTags>;
}

export interface IFrequentTags {
  _id: string;
  tag_name: string;
  count: number;
}
