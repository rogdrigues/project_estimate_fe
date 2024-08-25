import { getSession } from 'next-auth/react';
import { NextApiRequest, NextApiResponse } from 'next';

export const authenticate = async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const session = await getSession({ req });

    if (!session) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const role = session.user.role.roleName.toLowerCase();

    if (role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden' });
    }

    next();
};
