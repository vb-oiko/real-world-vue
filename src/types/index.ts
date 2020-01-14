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
  categories: string[];
}

export interface UserState {
  user: {
    id: string;
    name: string;
  };
}

export interface EventState {
  events: MyEvent[];
  eventsTotal: number;
  event: MyEvent | null;
}

export interface Notification {
  id: number;
  type: string;
  message: string;
}

export interface NotificationState {
  notifications: Notification[];
}
