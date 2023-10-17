"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";
import { supabase } from "../lib/supabase";
import axios from 'axios'

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);


  const fetchPosts = async () => {
    console.log('1')
    const response = await axios.get("/api/prompt");
    console.log('2')
    const data = await response.json();
    console.log('3')
    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);


  // const [allPosts, setAllPosts] = useState([]);

  // // Search states


  // const fetchPosts = async () => {
  //   const response = await fetch("/api/prompt");
  //   const data = await response.json();

  //   setAllPosts(data);
  // };

  // useEffect(() => {
  //   fetchPosts();
  // }, []);

  useEffect(() => {
    console.log('allPosts', allPosts)
  }, [allPosts]);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      {/* All Prompts */}
      {searchText ? (
        <>searchtext</>
      ) : (
        <>no text</>
      )}
      {/* {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )} */}
    </section>

  );
};

export default Feed;
