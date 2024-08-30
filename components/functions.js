import axios from "axios"
import { DateTime } from 'luxon';


/**
 * Logs a message along with the current date and time.
 *
 * @param {string} message - The message to be logged.
 * @returns {Promise} A promise that resolves with the response data.
 */
export async function LogsFunction(message) {
    const dateIST = DateTime.now().setZone('Asia/Kolkata').toISO();

    const response = await axios.post(
        `${import.meta.env.VITE_URL}/logs`,
        { message, date: dateIST },
        {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': sessionStorage.getItem('token'),
            },
        }
    );

    return response;
}

/**
 * Fetches all categories.
 *
 * @returns {Promise} A promise that resolves with an array of category data.
 */
export const FetchCategories = async () => {
    const res = await axios.get(`${import.meta.env.VITE_URL}/category/get-all-category`)
    return res.data.category
}

/**
 * Fetches all location countries.
 *
 * @returns {Promise} A promise that resolves with an array of country data.
 */
export const FetchLocation = async () => {
    const res = await axios.get(`${import.meta.env.VITE_URL}/location/countries`)
    return res.data.countries
}


/**
 * Fetches all testimonials.
 *
 * @returns {Promise} A promise that resolves with an array of testimonial data.
 */
export const FetchTestimonials = async () => {
    const res = await axios.get(`${import.meta.env.VITE_URL}/api/testimonials`)
    return res.data.testimonialsData
}


/**
 * Fetches all payments.
 *
 * @returns {Promise} A promise that resolves with an array of payment data.
 */
export const FetchPayments = async () => {
    const response = await fetch(`${import.meta.env.VITE_URL}/payment/get-all`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': sessionStorage.getItem('token')
        },
    });

    const json = await response.json()
    return json.payments
}


/**
 * Fetches all blog categories.
 *
 * @returns {Promise} A promise that resolves with an array of blog category data.
 */
export const fetchBlogCategory = async () => {
    const res = await axios.get(`${import.meta.env.VITE_URL}/blog-category`)
    return res.data.data
}

/**
 * Fetches all blogs of a specific category.
 *
 * @param {string} id - The ID of the blog category.
 * @returns {Promise} A promise that resolves with an array of blog data.
 */
export const Fetchblogs = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_URL}/blog-category/get-blogs?category_id=${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    const json = await response.json()
    return json.blogs
}

/**
 * Fetches all users.
 *
 * @returns {Promise} A promise that resolves with an array of user data.
 */
export const fetchUsers = async () => {
    let response = await fetch(`${import.meta.env.VITE_URL}/auth/fetchusers`, {
        method: 'GET',
        headers: {
            'auth-token': sessionStorage.getItem('token')
        },

    });

    response = await response.json()
    return response.users
}

/**
 * Gets admin data.
 *
 * @returns {Promise} A promise that resolves with the admin user data.
 */
export const getAdmin = async () => {
    const response = await fetch(`${import.meta.env.VITE_URL}/auth/get-admin`, {
        method: 'POST',
        headers: {
            'auth-token': sessionStorage.getItem('token')
        },
    });

    const adminData = await response.json();
    sessionStorage.setItem('admin', adminData.user.isadmin)
    return adminData.user
}

/**
 * Fetches the count of blogs.
 *
 * @returns {Promise} A promise that resolves with the count data.
 */
export const fetchBlogsCount = async () => {
    const res = await axios.get(`${import.meta.env.VITE_URL}/blogs/count`)
    return res.data
}


/**
 * Fetches the chart data for blogs.
 *
 * @returns {Promise} A promise that resolves with the chart data.
 */
export const fetchBlogChart = async () => {
    const res = await axios.get(`${import.meta.env.VITE_URL}/analytics/blog`)
    return res.data
}

/**
 * Fetches all authors.
 *
 * @returns {Promise} A promise that resolves with an array of author data.
 */
export const fetchAuthors = async (id) => {
    const res = await axios.get(`${import.meta.env.VITE_URL}/blog-author`)
    return res.data
}


/**
 * Fetches a single testimonial by ID.
 *
 * @param {string} id - The ID of the testimonial.
 * @returns {Promise} A promise that resolves with the testimonial data.
 */
export const fetchSingleTestimonial = async (id) => {
    const res = await axios.get(`${import.meta.env.VITE_URL}/api/${id}`)
    return res.data
}


/**
 * Formats a date string to a relative date.
 *
 * @param {string} dateString - The date string to be formatted.
 * @returns {string} The formatted relative date.
 */
export function formatDateToRelative(dateString) {
    const currentDate = new Date().toISOString().slice(0, 10);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const formattedDate = dateString.slice(0, 10);

    if (formattedDate === currentDate) {
        return 'Today';
    } else if (formattedDate === yesterday.toISOString().slice(0, 10)) {
        return 'Yestarday';
    } else {
        return formattedDate;
    }
}

/**
 * Fetches sitemaps for a specific slug.
 *
 * @param {string} slug - The slug for which sitemaps are fetched.
 * @returns {Promise} A promise that resolves with an array of sitemap pages.
 */
export const fetchSitemaps = async (slug) => {
    const res = await axios.get(`${import.meta.env.VITE_URL}/sitemap/pages/${slug}`)
    return res.data.pages
}

/**
 * Fetches sitemaps for blogs.
 *
 * @returns {Promise} A promise that resolves with an array of blog sitemaps.
 */
export const fetchBlogSitemaps = async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_URL}/sitemap/blogs`)
        return res.data.blogs
    } catch (error) {
        console.log(error)
    }
}

