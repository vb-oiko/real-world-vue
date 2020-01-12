export interface User {
  id: string;
  name: string;
}

export interface MyEvent {
  id: number;
  user: User;
  category: string;
  organizer: User;
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  attendies: User[];
}

export interface AppState {
  user: {
    id: string;
    name: string;
  };
  categories: string[];
  events: MyEvent[];
}
