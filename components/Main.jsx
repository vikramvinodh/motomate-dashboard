import React, { Suspense, useEffect, useState, useCallback, useMemo } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AppProvider } from './Context';
import { getAdmin } from './functions';
import { sidebarData } from './SidebarData';
import Restrected from './others/Restrected';
import StickyBottom from './others/StickyBottom';
import Loading from './others/Loading'
import Product from './products/Product';

const Navbar = React.lazy(() => import('./Navbar'));
const Side = React.lazy(() => import('./Side'));
const UsersList = React.lazy(() => import('./users/UsersList'));
const Login = React.lazy(() => import('./authorization/Login'));
const CreateUser = React.lazy(() => import('./users/CreateUser'));
const EditUser = React.lazy(() => import('./users/EditUser'));
const Gallery = React.lazy(() => import('./Media/Gallery'));
const ChangePassword = React.lazy(() => import('./authorization/ChangePassword'));
const AddProduct = React.lazy(() => import('../components/products/AddProduct'));
const ManageBlogs = React.lazy(() => import('./blogs/ManageBlogs'));
const ManageAuthors = React.lazy(() => import('./blogs/ManageAuthors'));
const CreateBlog = React.lazy(() => import('./blogs/CreateBlog'));
const EditBlog = React.lazy(() => import('./blogs/EditBlog'));
const CreateBlogCategory = React.lazy(() => import('./blogs/CreateBlogCategory'));
const Articles = React.lazy(() => import('./blogs/Articles'));
const EditBlogCategory = React.lazy(() => import('./blogs/EditBlogCategory'));
const CreateBlogAuthor = React.lazy(() => import('./blogs/CreateBlogAuthor'));
const EditBlogAuthor = React.lazy(() => import('./blogs/EditBlogAuthor'));




function Main() {
	const [adminData, setAdminData] = useState(() => {
		const storedData = sessionStorage.getItem('adminData');
		return storedData ? JSON.parse(storedData) : null;
	});

	const navigate = useNavigate();
	const token = sessionStorage.getItem('token');

	const currentLocation = useLocation();
	const isLoginPage = currentLocation.pathname === '/login';
	const isGalleryPage = currentLocation.pathname === '/pop-gallery';
	const location = currentLocation.pathname.replace('/', '');

	useEffect(() => {
		async function fetchData() {
			if (!token) {
				navigate('/login');
			}
		}
		fetchData();
	}, [token, navigate]);

	useEffect(() => {
		async function adminEffect() {
			const admin = await getAdmin();
			setAdminData(admin);
			sessionStorage.setItem('adminData', JSON.stringify(admin));
			hasAccess();
		}

		adminEffect();
	}, [token]);

	const hasAccess = useCallback((isadmin) => {

		const Flags = useMemo(() => sidebarData.map((ele) => ({ ...ele })), []);
		const extraSlug = useMemo(() => location.includes('/'), [location]);

		if (extraSlug) {
			const slug1 = location && location.split('/')[0];
			const slug2 = location && location.split('/')[1];

			// The filter function should return true for items that match the condition.
			const filteredFlags = Flags.filter(
				(ele) =>
					ele.sublist &&
					ele.sublist.some(
						(sub) =>
							sub.label.toLowerCase() === slug2.toLowerCase().replace('-', ' ')
					)
			);

			if (filteredFlags.length > 0) {
				// Check if any of the filtered flags have the required admin access.
				if (filteredFlags.some((flag) => flag.flag.includes(isadmin))) {
					return true;
				}
			} else {
				const filteredFlagsSlug1 = Flags.filter(
					(ele) =>
						ele.label.toLowerCase() === slug1.toLowerCase().replace('-', ' ')
				);
				if (
					filteredFlagsSlug1.length > 0 &&
					filteredFlagsSlug1[0].flag.includes(isadmin)
				) {
					return true;
				}
			}
		} else {
			const filteredFlags = Flags.filter(
				(ele) =>
					ele.label.toLowerCase() === location.toLowerCase().replace('-', ' ')
			);
			if (filteredFlags.length > 0 && filteredFlags[0].flag.includes(isadmin)) {
				return true;
			}
		}
		return false;

	}, [location]);

	return (
		<AppProvider>
			<div className="sidebar d-flex">
				{!isLoginPage && !isGalleryPage && <Suspense fallback={<div>Loading...</div>}><Side /></Suspense>}

				<main className="main-container" style={{ minHeight: '100%' }}>
					{!isLoginPage && !isGalleryPage && <Suspense fallback={<div>Loading...</div>}><Navbar /></Suspense>}
					<div className="outer-container">

						<Suspense fallback={<div><Loading /></div>}>
							<Routes>

								<Route path="/login" element={<Login />} />

								{/* Admin */}
								<Route path="users" element={hasAccess(adminData && adminData.isadmin) ? (<UsersList />) : (<Restrected />)} />
								<Route path="users/create-user" element={hasAccess(adminData && adminData.isadmin) ? (<CreateUser />) : (<Restrected />)} />
								<Route path="users/edit-user/:id" element={hasAccess(adminData && adminData.isadmin) ? (<EditUser />) : (<Restrected />)} />
								<Route path="/change-password" element={hasAccess(adminData && adminData.isadmin) ? (<ChangePassword />) : (<Restrected />)} />

								{/* products */}
								<Route path="/products/add-product" element={hasAccess(adminData && adminData.isadmin) ? (<AddProduct />) : (<Restrected />)} />
								<Route path="/products/add-product/:id" element={hasAccess(adminData && adminData.isadmin) ? (<AddProduct />) : (<Restrected />)} />
								<Route path="/products/product-list" element={hasAccess(adminData && adminData.isadmin) ? (<Product />) : (<Restrected />)} />

								{/* Blogs Routes */}
								<Route path="blog/articles" element={hasAccess(adminData && adminData.isadmin) ? (<Articles />) : (<Restrected />)} />
								<Route path="blog/create-blog" element={hasAccess(adminData && adminData.isadmin) ? (<CreateBlog />) : (<Restrected />)} />
								<Route path="blog/edit-article/:id" element={hasAccess(adminData && adminData.isadmin) ? (<EditBlog />) : (<Restrected />)} />
								<Route path="blog/manage-blogs" element={hasAccess(adminData && adminData.isadmin) ? (<ManageBlogs />) : (<Restrected />)} />
								<Route path="blog/manage-blogs/category" element={hasAccess(adminData && adminData.isadmin) ? (<CreateBlogCategory />) : (<Restrected />)} />
								<Route path="blog/manage-blogs/edit-category/:id" element={hasAccess(adminData && adminData.isadmin) ? (<EditBlogCategory />) : (<Restrected />)} />
								<Route path="blog/manage-blogs" element={hasAccess(adminData && adminData.isadmin) ? (<ManageBlogs />) : (<Restrected />)} />
								<Route path="blog/manage-authors" element={hasAccess(adminData && adminData.isadmin) ? (<ManageAuthors />) : (<Restrected />)} />
								<Route path="blog/manage-authors/author" element={hasAccess(adminData && adminData.isadmin) ? (<CreateBlogAuthor />) : (<Restrected />)} />
								<Route path="blog/manage-authors/edit-author/:id" element={hasAccess(adminData && adminData.isadmin) ? (<EditBlogAuthor />) : (<Restrected />)} />

								<Route path="media" element={hasAccess(adminData && adminData.isadmin) ? (<Gallery />) : (<Restrected />)} />

								{/* other routes */}
								{isGalleryPage && (
									<Route path="/pop-gallery" element={<Gallery />} />
								)}
							</Routes>
						</Suspense>
					</div>

				</main>
				<StickyBottom />
			</div>
		</AppProvider>
	);
}

export default Main;
