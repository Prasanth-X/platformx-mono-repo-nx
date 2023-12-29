/* eslint-disable no-debugger */
import { useEffect, useState } from 'react';
import { ProtectedRoute } from '../../router/ProtectedRoute';

export const useDynamicRoutes = (menuData, existingRoutes) => {
    const [generatedRoutes, setGeneratedRoutes] = useState([]);

    useEffect(() => {
        const generateRoutes = () => {
            const routes: any = [];

            menuData.forEach((menu) => {
                if (menu.Menu) {
                    menu.Menu.forEach((menuItem) => {
                        const routeConfig = {
                            path: menuItem.url,
                            element: (
                                <ProtectedRoute
                                    category={menuItem.category}
                                    subCategory={menuItem.subCategory}

                                >
                                    {menuItem.component}
                                </ProtectedRoute>
                            ),
                        };

                        routes.push(routeConfig);
                    });
                }
            });

            setGeneratedRoutes(routes);
        };

        generateRoutes();
    }, [menuData]);

    return [...existingRoutes, ...generatedRoutes];
};
