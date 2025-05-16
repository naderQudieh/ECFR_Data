import { lazy } from "react";
import {  createBrowserRouter  } from "react-router-dom";
import NotFound from "./pages/NotFound";
import HomeApp from "./pages/Home";
import TitelParagraphsApp from "./pages/TitelParagraphs";
import TitlesSummary from "./pages/TitlesSummary";
import ParentLayout from "./components/ParentLayout";
 
import Home from "./pages/Home";
import StaticPage from "./pages/StaticPage";

const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

export const router = createBrowserRouter([
    {
        path: '/',
        element: <ParentLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
           
            {
                path: 'titles',
                element: <TitlesSummary />,
            }, 
            {
                path: 'paragraphs',
                element: <TitelParagraphsApp />,
            },
            {
                path: 'about',
                element: <About />,
            },
            {
                path: 'contact',
                element: <Contact />,
                //loader: () => fetch('/api/home-data'), // Data loading
                // errorElement: <ErrorPage />  
            },
            {
                path: 'privacy',
                element: <StaticPage page="privacy" />,
            },
            {
                path: '*',
                element: <NotFound />,
            },
        ],
    },
]);
 
 
 