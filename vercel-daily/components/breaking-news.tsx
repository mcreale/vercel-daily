'use client';
/// load this component on the client side because we don't want to cache this data. it rotates and changes so we don't want to have it cached
import { BreakingNewsItem } from "@/lib/types/return-types";
import { faBolt, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Suspense } from "react";

export default function BreakingNews({breakingNews}: {breakingNews: BreakingNewsItem}) {
  const {summary, urgent} = breakingNews;
  return (
    <>
      {breakingNews &&
      <section className="dark:bg-gray-800 bg-gray-100 text-gray-800 dark:text-gray-100 py-4">
        <div className="container">
          {urgent ? <span><FontAwesomeIcon icon={faBolt} className="text-yellow-500 mr-2" /> <span className="bg-white text-black rounded-xl font-bold px-2 uppercase mr-2">Urgent</span></span> 
          
          : <span><FontAwesomeIcon icon={faNewspaper}  className="textwhite mr-2" /><span className="bg-white text-black rounded-xl font-bold px-2 uppercase mr-2">Breaking</span></span>}
          {summary}
        </div>
      </section>
      }
    </>
  );
}