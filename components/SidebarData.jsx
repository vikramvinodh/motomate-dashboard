import { FaBlogger } from 'react-icons/fa';
import { SiMicrosoftaccess } from 'react-icons/si';
import { HiUsers } from 'react-icons/hi';
import { MdPermMedia, MdAddHome, } from 'react-icons/md';

export const sidebarData = [
	{
		label: 'Users',
		icon: <HiUsers fill="#7081b9" size={20} />,
		flag: [0, 1],
	},
	{
		label: 'Products',
		icon: <MdAddHome fill="#7081b9" size={20} />,
		flag: [0, 1, 3, 4],
		sublist: [
			{
				label: 'Add Product',
			},
			{
				label: 'Product List',
			},
		],
	},
	{
		label: 'Logs',
		icon: <SiMicrosoftaccess fill="#7081b9" size={20} />,
		flag: [0],
		sublist: [
			{
				label: 'User logs',
			},
		],
	},
	{
		label: 'Media',
		icon: <MdPermMedia fill="#7081b9" size={20} />,
		flag: [0, 1, 3, 4],
	},
	{
		label: 'Blog',
		icon: <FaBlogger fill="#7081b9" size={20} />,
		flag: [0, 1, 3, 4],
		sublist: [
			{
				label: 'Articles',
			},
			{
				label: 'Manage Blogs',
			},
			{
				label: 'Manage Authors',
			},
		],
	},

];
