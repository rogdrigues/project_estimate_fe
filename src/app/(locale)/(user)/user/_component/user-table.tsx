import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import BlockIcon from '@mui/icons-material/Block';
import { UserMaster } from '@/types';

const mockUsers: UserMaster[] = [
    {
        id: '1',
        displayName: 'user123',
        username: 'John Doe',
        email: 'john.doe@example.com',
        role: 'Admin',
        division: 'FSU1',
        department: 'D1',
        profile: {
            fullName: 'John Doe',
            dateOfBirth: new Date('1990-01-01'),
            gender: 'Male',
            phoneNumber: '123-456-7890',
            location: 'Hanoi, Vietnam',
            avatar: 'https://via.placeholder.com/150',
        },
        status: false,
        lastLogin: new Date('2021-12-31T23:59:59'),
    },
    {
        id: '1',
        displayName: 'user123',
        username: 'John Doe',
        email: 'john.doe@example.com',
        role: 'Admin',
        division: 'FSU1',
        department: 'D1',
        profile: {
            fullName: 'John Doe',
            dateOfBirth: new Date('1990-01-01'),
            gender: 'Male',
            phoneNumber: '123-456-7890',
            location: 'Hanoi, Vietnam',
            avatar: 'https://via.placeholder.com/150',
        },
        status: false,
        lastLogin: new Date('2021-12-31T23:59:59'),
    }
];

const UserTable = () => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ border: '1px solid rgba(0, 0, 0, 0.5)' }}>
                <TableHead>
                    <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell>Account</TableCell>
                        <TableCell>Full Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Division</TableCell>
                        <TableCell>Department</TableCell>
                        <TableCell>Phone Number</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {mockUsers.map((user, index) => (
                        <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell> {/* Số thứ tự */}
                            <TableCell>{user.displayName}</TableCell>
                            <TableCell>{user.profile?.fullName}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>{user.division}</TableCell>
                            <TableCell>{user.department}</TableCell>
                            <TableCell>{user.profile?.phoneNumber}</TableCell>
                            <TableCell>
                                {user.status ? (
                                    <span style={{ color: '#6550cf', display: 'flex', alignItems: 'center' }}>
                                        <CheckCircleOutlineIcon color="success" fontSize="small" style={{ marginRight: '4px', color: "#6550cf" }} />
                                        Enabled
                                    </span>
                                ) : (
                                    <span style={{ color: '#f90009', display: 'flex', alignItems: 'center' }}>
                                        <BlockIcon color="error" fontSize="small" style={{ marginRight: '4px', color: '#f90009' }} />
                                        Disabled
                                    </span>
                                )}
                            </TableCell>
                            <TableCell>
                                <IconButton aria-label="edit">
                                    <EditIcon />
                                </IconButton>
                                <IconButton aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UserTable;
