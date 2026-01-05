"use client";

import React, { useEffect } from "react";
import axios from "axios";

import { PlaygroundHeader } from "../_components/PlaygroundHeader";
import { ChatSection } from "../_components/chatSection";
import { WebSiteDesign } from "../_components/webSiteDesign";
import { ElementSettingSection } from "../_components/elementSettingSection";

export type Frame={
    projectId:string,
    frameId:string,
    designCode:string,
    chatMessages:Message[]
} 

export type Message={
    role:string,
    content:string
}

function PlayGround({
  params,
  searchParams,
}: {
  params: Promise<{ projectId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {

  const { projectId } = React.use(params);
  const resolvedSearchParams = React.use(searchParams);
  const frameId = resolvedSearchParams.frameId as string | undefined;

  const [frameDetail,setFrameDetail] = React.useState<Frame>()

  useEffect(() => {
    if (!frameId) return;

    const getFrameDetails = async () => {
      const res = await axios.get(
        `/api/frames?frameId=${frameId}&projectId=${projectId}`
      );
      console.log(res.data);
      setFrameDetail(res.data);
    };
    getFrameDetails();
  }, [frameId, projectId]);

  const SendMessage=(input:string)=>{
    console.log(input)
  }

  return (
    <div className="h-screen flex flex-col">
      <PlaygroundHeader />
      <div className="flex flex-1 overflow-hidden">
        <ChatSection messages={frameDetail?.chatMessages ?? []} onSend={(input:string)=>{
            SendMessage(input)
        }}/>
        <WebSiteDesign />
        <ElementSettingSection />
      </div>
    </div>
  );
}

export default PlayGround;
