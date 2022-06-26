import React from "react";
import { Navigate } from "react-router-dom";
import swal from 'sweetalert'

export default function ProtectedRoute ({token, child}) {
    if (token === 'Bearer null') {

        swal("Anda belum login.","Jika sudah login, coba untuk login ulang mungkin akan membantu", "error");
        return <Navigate to="/" replace />
    }
    return child
}