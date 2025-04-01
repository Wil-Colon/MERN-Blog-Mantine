import './adminblogpage.scss';
import BlogsList from '../../BlogList/BlogsList';

export default function AdminBlogPage() {
    return <BlogsList edit={true} />;
}
