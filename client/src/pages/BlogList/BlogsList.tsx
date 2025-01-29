import { useEffect, useState } from 'react';
import axios from 'axios'; // Assuming you're using Axios for API calls
import './bloglist.scss';
import { Grid } from '@mantine/core';
import { Link } from 'react-router-dom';
import BlogCard from '../../components/BlogCard/BlogCard';
import BodyContainer from '../../components/BodyContainer/BodyContainer';

export default function BlogsList() {
    const [blogs, setBlogs] = useState([]); // Blogs for the current page
    const [filteredBlogs, setFilteredBlogs] = useState([]); // Blogs matching the search query
    const [searchQuery, setSearchQuery] = useState(''); // Search query
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const blogsPerPage = 6;

    useEffect(() => {
        fetchBlogs(currentPage);
    }, [currentPage]); // Fetch data when page changes

    useEffect(() => {
        // Filter blogs based on the search query
        if (searchQuery.trim() === '') {
            setFilteredBlogs(blogs); // Reset to all blogs if no query
        } else {
            const query = searchQuery.toLowerCase();
            const results = blogs.filter(
                (blog) =>
                    blog.title.toLowerCase().includes(query) ||
                    blog.body.toLowerCase().includes(query)
            );
            setFilteredBlogs(results);
        }
    }, [searchQuery, blogs]);

    // Fetch blogs from backend with pagination
    const fetchBlogs = async (page) => {
        try {
            const response = await axios.get(
                `http://localhost:3000/api/blog/limit?page=${page}&limit=${blogsPerPage}`
            );
            setBlogs(response.data.blogs);
            setFilteredBlogs(response.data.blogs); // Reset filteredBlogs to fetched blogs
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value); // Update search query
    };

    return (
        <BodyContainer fluid={false} size="lg" pb={80}>
            {/* Search Bar */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search blogs..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
            <Grid justify="center" grow>
                {filteredBlogs.map((blog, i) => (
                    <Grid.Col
                        key={i}
                        span={{ base: 11, md: 6, lg: 5 }}
                        className="body-container__column"
                    >
                        <Link
                            to={`/blogs/${
                                blog !== null
                                    ? blog?.title
                                          .replace(/ /g, '-')
                                          .replace(/[.,!?;]/g, '')
                                    : null
                            }`}
                            state={blog}
                        >
                            <BlogCard blogData={blog} />
                        </Link>
                    </Grid.Col>
                ))}
            </Grid>

            {/* Pagination */}
            <div className="pagination">
                <button
                    className="page-button"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>

                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        className={`page-button ${
                            currentPage === i + 1 ? 'active' : ''
                        }`}
                        onClick={() => handlePageChange(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    className="page-button"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </BodyContainer>
    );
}
