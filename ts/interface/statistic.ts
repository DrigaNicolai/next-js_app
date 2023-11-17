export interface IGlobalStatistic {
  total_users: number;
  total_posts: number;
  frequent_tags: Array<IFrequentTag>;
}

export interface IFrequentTag {
  _id: string;
  tag_name: string;
  count: number;
}

export interface IUserStatistic {
  total_posts: number;
  favorite_tag: IFrequentTag;
  warning_points: { total_points: number };
}
