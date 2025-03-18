"use client";
import { Provider } from "react-redux";
import UsersDetails from "./_users-details";
import store from "@/redux/store";

export default function Home() {
  return (
    <Provider store={store}>
      <UsersDetails />
    </Provider>
  );
}
