import { FaBlogger } from 'react-icons/fa';
import { SiMicrosoftaccess } from 'react-icons/si';
import { HiUsers } from 'react-icons/hi';
import { MdPermMedia, MdLocationOn, MdAddHome,MdContentCopy, MdTextFormat, MdOutlineFeedback} from 'react-icons/md';
import kandraLogo from '../public/kandraLogo.png';

export const sidebarData = [
	{
		label: 'Users',
		icon: <HiUsers fill="#7081b9" size={20} />,
		flag: [0, 1],
	},

	// {
	// 	label: 'Properties',
	// 	icon: <MdAddHome fill="#7081b9" size={20} />,
	// 	flag: [0,1,3,4],
	// 	sublist: [
	// 		{
	// 			label: 'Add Property',
	// 		},
	// 		{
	// 			label: 'Property List',
	// 		},
	// 		{
	// 			label: 'Property Types',
	// 		},
	// 	],
	// },
	{
		label: 'Products',
		icon: <MdAddHome fill="#7081b9" size={20} />,
		flag: [0,1,3,4],
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
