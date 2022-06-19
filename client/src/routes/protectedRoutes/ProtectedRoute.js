import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute ({token, child}) {
    if (token === 'Bearer null') {
        return <Navigate to="/" replace />
    }
    return child
}