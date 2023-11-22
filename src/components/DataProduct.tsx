import jusnaga from '../components/Pictures/jusnaga.jpg'
import mieayam from '../components/Pictures/mieayam.png'
import sushi from '../components/Pictures/sushi.jpg'
import nasihainam from '../components/Pictures/nasihainam.jpg'
import topokki from '../components/Pictures/topokki.jpg'
import burger from '../components/Pictures/burger.jpg'
import fotoprofil from '../components/Pictures/CanAway.png';


export interface Product 
{
    id: number;
    image: any;
    name: string;
    // price: number;
}

export interface Profile 
{
    id: number;
    image: any;
    Name: string;
    NIM: string;

}

export interface Wishlist 
{
    id: number;
    image: any;
    name: string;
    // price: number;
}
  
export interface Cart
{
    id: number;
    image: any;
    name: string;
    // price: number;
    quantity: number;
}

export interface History
{
    id: number;
    image: any;
    name: string;
    // price: number;
    quantity: number;
}


export const ProductData: Product[] = 
[
    { id: 1, image: nasihainam , name: 'Nasi Hainam Ibu Pertiwi'},
    { id: 2, image: burger , name: 'Burger Enak & Murah'},
    { id: 3, image: jusnaga , name: 'Aneka Juice dan Buah-buahan'},
    { id: 4, image: sushi , name: 'Japanese Food & Dessert',},
    { id: 5, image: topokki , name: 'Topokki & The Gengs'},
    { id: 6, image: mieayam , name: 'Mie Ayam Pak Bima'},

];

export const ProfileData: Profile[] =
[

    {id: 1, image: fotoprofil , Name: 'CanAway', NIM: '124214'}

]

export const WishlistData: Wishlist[] = [];


export const CartData: Cart[] = [];

export const HistoryData: History[] = [];