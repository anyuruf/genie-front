import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import ChildrenByFather from './children-by-father';
import ChildrenByFatherDeleteDialog from './children-by-father-delete-dialog';
import ChildrenByFatherDetail from './children-by-father-detail';
import ChildrenByFatherUpdate from './children-by-father-update';

const ChildrenByFatherRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<ChildrenByFather />} />
    <Route path="new" element={<ChildrenByFatherUpdate />} />
    <Route path=":id">
      <Route index element={<ChildrenByFatherDetail />} />
      <Route path="edit" element={<ChildrenByFatherUpdate />} />
      <Route path="delete" element={<ChildrenByFatherDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ChildrenByFatherRoutes;
