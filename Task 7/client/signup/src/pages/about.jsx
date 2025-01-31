import React from "react";

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-600 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">About Our Blog</h1>
        <p className="text-gray-700 mb-4">
          Welcome to our Blog App! This platform allows users to create, share, and explore insightful blog posts
          on a variety of topics. Whether you are a writer, reader, or enthusiast, our blog provides a space to
          express your thoughts and engage with a community of like-minded individuals.
        </p>
        <h2 className="text-2xl font-semibold text-blue-500 mt-4">Features</h2>
        <ul className="text-gray-700 mt-2 list-disc list-inside text-left">
          <li>Create and publish blog posts with images.</li>
          <li>Edit and manage your blog content easily.</li>
          <li>Engage with other users through reading and sharing posts.</li>
          <li>Responsive and user-friendly design.</li>
        </ul>
        <p className="text-gray-700 mt-6">
          We aim to build a vibrant community of bloggers who can inspire, educate, and entertain. Join us on this
          journey of storytelling and knowledge-sharing!
        </p>
      </div>
    </div>
  );
};

export default About;