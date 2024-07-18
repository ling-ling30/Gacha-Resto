import React from "react";
import AddRestaurantForm from "./_components/AddRestaurantForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {};

export default function Page({}: Props) {
  return (
    <div className="w-full h-full flex items-center justify-center mt-20 ">
      <Card className="max-w-4xl bg-[#ffd3c5] sm:p-10">
        <CardHeader>
          <CardTitle>Add a restaurant</CardTitle>
        </CardHeader>
        <CardContent>
          <AddRestaurantForm />
        </CardContent>
      </Card>
    </div>
  );
}
