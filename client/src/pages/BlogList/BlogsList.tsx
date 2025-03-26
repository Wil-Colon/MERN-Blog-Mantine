import './bloglist.scss';
import BodyContainer from '../../components/BodyContainer/BodyContainer';
import BlogCard from '../../components/BlogCard/BlogCard';
import axios from 'axios'; // Assuming you're using Axios for API calls
import { useEffect, useState } from 'react';
import { Button, Grid, Input } from '@mantine/core';
import { Link } from 'react-router-dom';

export default function BlogsList() {
    const [blogs, setBlogs] = useState([]); // Stores displayed blogs
    const [searchResults, setSearchResults] = useState([]); // Stores search results
    const [searchQuery, setSearchQuery] = useState(''); // Search input
    const [isSearching, setIsSearching] = useState(false); // Flag to determine if searching
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [value, setValue] = useState('');
    const blogsPerPage = 6;

    useEffect(() => {
        if (!isSearching) {
            fetchBlogs(currentPage);
        }
    }, [currentPage, isSearching]); // Fetch only when page changes or search stops

    useEffect(() => {
        if (searchQuery.trim()) {
            fetchSearchResults(searchQuery);
        } else {
            fetchBlogs(currentPage);
        }
    }, [currentPage, searchQuery]); // Fetch new data when page or search query changes

    // Fetch blogs for the current page
    const fetchBlogs = async (page) => {
        try {
            const response = await axios.get(
                `http://localhost:3000/api/blog/limit?page=${page}&limit=${blogsPerPage}`
            );
            setBlogs(response.data.blogs);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    // Fetch search results from the backend
    const fetchSearchResults = async (query) => {
        if (!searchQuery.trim()) return; // Prevent empty search
        try {
            const response = await axios.get(
                `http://localhost:3000/api/blog/search?q=${query}`
            );
            setSearchResults(response.data);
            setIsSearching(true);
        } catch (error) {
            console.error('Error searching blogs:', error);
        }
    };

    const searchButton = (value) => {
        setSearchQuery(value);
        fetchSearchResults(value);
    };

    // Reset search and show paginated results
    const resetSearch = () => {
        setIsSearching(false);
        setSearchQuery('');
        setSearchResults([]);
        setValue('');
    };

    // Determine what to display: search results or paginated blogs
    const displayedBlogs = searchQuery.trim() ? searchResults : blogs;

    return (
        <BodyContainer fluid={false} size="lg" pb={80}>
            {/* Search Bar */}
            <div className="search-bar">
                <Input
                    value={value}
                    onChange={(event) => setValue(event.currentTarget.value)}
                    type="text"
                    placeholder="Search blogs..."
                />
                <Button
                    disabled={!value && true}
                    className="search-bar__button"
                    onClick={() => searchButton(value)}
                >
                    Search
                </Button>
                {isSearching && (
                    <Button
                        onClick={resetSearch}
                        className="search-bar__button"
                    >
                        Clear
                    </Button>
                )}
            </div>

            <Grid justify="center" grow>
                {displayedBlogs.length > 0 ? (
                    displayedBlogs.map((blog) => (
                        <Grid.Col
                            key={blog._id}
                            span={{ base: 11, md: 6, lg: 5 }}
                            className="body-container__column"
                        >
                            <Link
                                to={`/blogs/${
                                    blog !== null
                                        ? `${blog._id}-${blog?.title
                                              .replace(/ /g, '-')
                                              .replace(/[.,!?;]/g, '')}`
                                        : null
                                }`}
                                state={blog}
                            >
                                <BlogCard blogData={blog} />
                            </Link>
                        </Grid.Col>
                    ))
                ) : (
                    <p>No blogs found.</p>
                )}
            </Grid>

            {/* Pagination (Hidden when searching) */}
            {!isSearching && (
                <div className="pagination">
                    <Button
                        // className="page-button"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </Button>

                    {[...Array(totalPages)].map((_, i) => (
                        <Button
                            variant="default"
                            key={i}
                            className={`page-button ${
                                currentPage === i + 1 ? 'active' : ''
                            }`}
                            onClick={() => setCurrentPage(i + 1)}
                        >
                            {i + 1}
                        </Button>
                    ))}

                    <Button
                        // className="page-button"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </Button>
                </div>
            )}
        </BodyContainer>
    );
}
