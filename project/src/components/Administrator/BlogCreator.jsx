import React, { useState, useEffect } from 'react';
import './BlogCreator.css';
import { supabase } from '../../utils/supabaseClient'; // Adjust the import according to your project structure
import { uploadBlog } from '../../utils/imageUtils'; // Adjust the import according to your project structure

function BlogCreator() {
    const [blogs, setBlogs] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [date, setDate] = useState('');
    const [destination, setDestination] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);
    const [notification, setNotification] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        let { data, error } = await supabase
            .from('blogs')
            .select('id, title, author, date, destination, description');

        if (error) {
            console.error("Error fetching blogs:", error);
        } else {
            console.log("Fetched blogs:", data);
            setBlogs(data);
        }
    };

    const handleCreateBlog = async () => {
        let imageUrl = null;
        if (image) {
            const uploadResult = await uploadBlog(image);
            if (uploadResult.error) {
                console.error("Error uploading image:", uploadResult.error);
                return;
            }
            imageUrl = uploadResult.publicURL;
        }

        // Raw SQL insert statement
        const sqlInsert = `
            INSERT INTO blogs (title, author, date, destination, description, image)
            VALUES ('${title}', '${author}', '${date}', '${destination}', '${description}', '${imageUrl}')
            RETURNING id;
        `;

        let { data, error } = await supabase.rpc('run_raw_sql', {
            sql: sqlInsert
        });

        if (error) {
            console.error("Error creating blog:", error);
            return;
        }

        console.log("Created blog:", data);

        const newBlog = {
            id: data[0].id, // Assuming the RPC returns the inserted row with an id
            title,
            author,
            date,
            destination,
            description,
            image: imageUrl,
        };
        setBlogs([...blogs, newBlog]);
        clearForm();
    };

    const handleUpdateBlog = async (e) => {
        e.preventDefault();
        setError(null);

        if (!selectedRow) {
            setError("No blog selected for update.");
            return;
        }

        // Raw SQL update statement
        const sqlUpdate = `
            UPDATE blogs
            SET title = '${title}', author = '${author}', date = '${date}', destination = '${destination}', description = '${description}'
            WHERE id = '${selectedRow}';
        `;

        const { data, error: updateError } = await supabase.rpc('run_raw_sql', {
            sql: sqlUpdate
        });

        if (updateError) {
            console.error("Error updating blog:", updateError);
            setError("An error occurred while updating the blog. Please try again.");
        } else {
            console.log("Updated blog successfully");
            setNotification("Blog has been updated successfully!");
            fetchBlogs(); // Refresh the blog list
            clearForm();
        }
    };

    const handleDelete = async (id) => {
        const sqlDelete = `
            DELETE FROM blogs
            WHERE id = '${id}';
        `;

        const { error } = await supabase.rpc('run_raw_sql', {
            sql: sqlDelete
        });

        if (error) {
            console.error("Error deleting blog:", error);
        } else {
            setBlogs(blogs.filter(blog => blog.id !== id));
        }
    };

    const handleRowClick = (blog) => {
        setSelectedRow(blog.id);
        setTitle(blog.title);
        setAuthor(blog.author);
        setDate(blog.date);
        setDestination(blog.destination);
        setDescription(blog.description);
        setIsEditing(true);
    };

    const clearForm = () => {
        setTitle('');
        setAuthor('');
        setDate('');
        setDestination('');
        setDescription('');
        setImage(null);
        setSelectedRow(null);
        setIsEditing(false);
    };

    const handleImageUpload = (event) => {
        setImage(event.target.files[0]);
    };

    return (
        <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
            {/* Blog Creator Form */}
            <div style={{ flex: 1 }}>
                <h2>Blog Creator</h2>
                <div>
                    <label>Blog Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label>Author</label>
                    <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
                </div>
                <div>
                    <label>Date</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <div>
                    <label>Destination</label>
                    <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} />
                </div>
                <div>
                    <label>Description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div>
                    <label>Image</label>
                    <input type="file" onChange={handleImageUpload} />
                </div>
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition duration-200 ease-in-out"
                    onClick={handleCreateBlog}
                    disabled={isEditing}
                >
                    Create Blog
                </button>
                {isEditing && (
                    <button
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg transition duration-200 ease-in-out ml-2"
                        onClick={handleUpdateBlog}
                    >
                        Update Blog
                    </button>
                )}
            </div>

            {/* Blog List Table */}
            <div style={{ flex: 1 }}>
                <h2>Blog List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Date</th>
                            <th>Destination</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs && blogs.map((blog) => (
                            <tr
                                key={blog.id}
                                className={selectedRow === blog.id ? 'selected' : ''}
                                onClick={() => handleRowClick(blog)}
                            >
                                <td>{blog.title}</td>
                                <td>{blog.author}</td>
                                <td>{blog.date}</td>
                                <td>{blog.destination}</td>
                                <td>{blog.description}</td>
                                <td>
                                    <button
                                        className="bg-red-500 hover:bg-red-600 text-white font-semibold px-2 py-1 rounded-lg transition duration-200 ease-in-out"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(blog.id);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default BlogCreator;
