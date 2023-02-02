import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import Router, { useRouter } from "next/router";
import { ImagesResponseDataInner } from "openai";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { getRandomPrompt } from "../utils";

interface DataProviderProps {
  children: ReactNode;
}

interface Data {
  showcaseLoading: boolean;
  setShowcaseLoading: (loading: boolean) => void;
  error: Error | undefined;
  setError: (error: Error | undefined) => void;
  allPosts: Post[] | null;
  setAllPosts: any;
  userPosts: string[] | null;
  setUserPosts: any;
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
  searchTimeout: any;
  setSearchTimeout: (searchTimeout: any) => void;
  searchedResults: Post[] | null;
  setSearchedResults: any;
  generateData: GenerateData;
  setGenerateData: (generateData: GenerateData) => void;
  generatingImg: boolean;
  setGeneratingImg: (generatingImg: boolean) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  errorMsg: string;
  setErrorMsg: (errorMsg: string) => void;
  allTab: boolean;
  setAllTab: (allTab: boolean) => void;
  myFeedTab: boolean;
  setMyFeedTab: (myFeedTab: boolean) => void;
  session: Session | null;
}

export const DataContext = createContext<Data>({} as Data);

export function DataProvider({ children }: DataProviderProps) {
  const { data: session } = useSession();

  // Showcase Page States
  const [showcaseLoading, setShowcaseLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>();
  const [allPosts, setAllPosts] = useState(null);
  const [userPosts, setUserPosts] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);

  // Create Page States
  const [generateData, setGenerateData] = useState({
    name: "",
    prompt: "",
    dimension: "",
    photos: "",
    photoURL: "",
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [allTab, setAllTab] = useState(true);
  const [myFeedTab, setMyFeedTab] = useState(false);

  return (
    <DataContext.Provider
      value={{
        searchTimeout,
        setSearchTimeout,
        showcaseLoading,
        setShowcaseLoading,
        error,
        setError,
        allPosts,
        setAllPosts,
        userPosts,
        setUserPosts,
        searchQuery,
        setSearchQuery,
        searchedResults,
        setSearchedResults,
        generateData,
        setGenerateData,
        generatingImg,
        setGeneratingImg,
        loading,
        setLoading,
        errorMsg,
        setErrorMsg,
        allTab,
        setAllTab,
        myFeedTab,
        setMyFeedTab,
        session,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataProvider;
