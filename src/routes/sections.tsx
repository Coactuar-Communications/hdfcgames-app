import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { varAlpha } from 'src/theme/styles';
import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

export const HomePage = lazy(() => import('src/pages/home'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const SignInPage = lazy(() => import('src/pages/sign-in'));
export const Register = lazy(() => import('src/pages/register'));
export const ForgotPassword = lazy(() => import('src/pages/forgot-pword'));
export const SetNewPword = lazy(() => import('src/pages/set-new-pword'));
export const SignUpPage = lazy(() => import('src/pages/sign-up'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const ChessEmbed = lazy(() => import('src/pages/chessgame'));
export const SudokuEmbed = lazy(() => import('src/pages/sudoku'));


export const Page404 = lazy(() => import('src/pages/page-not-found'));
// export const Chessgame =lazy(()=>import('src/pages/chessgame'));

// ----------------------------------------------------------------------

const renderFallback = (
  <Box display="flex" alignItems="center" justifyContent="center" flex="1 1 auto">
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

export function Router() {
  return useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={renderFallback}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <HomePage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'chessgame', element:<ChessEmbed /> },
        { path: 'sudoku', element:  <SudokuEmbed />},


      ],
    },
    {
      path: 'sign-in',
      element: (
        <AuthLayout>
          <SignInPage />
        </AuthLayout>
      ),
    },
    {
      path: 'sign-up',
      element: (

        <AuthLayout>
          <SignUpPage />
        </AuthLayout>
      ),
    },
    {
      path: 'forgot-pword',
      element: (

        <AuthLayout>
          <ForgotPassword />
        </AuthLayout>
      ),
    },
    {
      path: 'set-new-pword',
      element: (

        <AuthLayout>
          <SetNewPword />
        </AuthLayout>
      ),
    },
    {
      path: 'games',
      element: (

        <AuthLayout>
          <Register />
        </AuthLayout>
      ),
    },
    // {
    //   path: 'chess',
    //   element: (

    //     <AuthLayout>
    //       <Chessgame />
    //     </AuthLayout>
    //   ),
    // },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
