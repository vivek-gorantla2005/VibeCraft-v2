"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

import { PlaygroundHeader } from "../_components/PlaygroundHeader";
import { ChatSection } from "../_components/chatSection";
import { Preview } from "../_components/preview";

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

  const [url, setUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('Ready');
  const [loading, setLoading] = useState(false);


  async function startDevServer() {
    setLoading(true);
    setStatus('Creating Sandbox...');

    try {
      // 1. Fetching project files
      setStatus('Fetching project files...');
      const filesResponse = await axios.get(`/api/previewFiles?projectId=${projectId}`);
      const files = filesResponse.data;
      console.log('Files fetched:', files);

      // 2. Initializing sandbox
      setStatus('Initializing sandbox environment...');
      const response = await axios.post('/api/sandbox', {
        projectId: projectId
      });
      const sandboxId = response.data.sandboxId;

      // 3. Uploading files to sandbox
      setStatus('Uploading files to sandbox...');
      await axios.post('/api/sandbox-files', {
        sandboxId: sandboxId,
        files: files
      });

      // 4. Starting development server
      setStatus('Starting development server...');

      if (response.data.url) {
        setUrl(response.data.url);
        setStatus('Server running!');
      } else {
        throw new Error("No URL returned from sandbox");
      }
    } catch (error: any) {
      console.error('Execution error:', error);
      setStatus(`Execution error: ${error.message || 'Unknown error'}`);
      setUrl(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!frameId) return;

    const getFrameDetails = async () => {
      try {
        const response = await axios.get(`/api/frames?frameId=${frameId}&projectId=${projectId}`);
      } catch (error) {
        console.error("Error fetching frame details:", error);
      }
    };
    getFrameDetails();
  }, [frameId, projectId]);

  return (
    <div className="h-screen flex flex-col bg-black text-white">
      <PlaygroundHeader
        startDevServer={startDevServer}
        loading={loading}
        url={url}
        status={status}
      />
      <div className="flex flex-1 overflow-hidden">
        <ChatSection />
        <main className="flex-1 overflow-auto bg-zinc-100/50">
          <Preview
            url={url}
            loading={loading}
            status={status}
          />
        </main>
      </div>
    </div>
  );
}

export default PlayGround;
