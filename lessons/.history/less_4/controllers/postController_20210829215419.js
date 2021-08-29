// const { User } = require('../dataBase');

// module.exports = {
//     getUserById: (req, res, next) => {
//         try {
//             res.json(req.user);
//         } catch (e) {
//             next(e);
//         }
//     },

//     getAllUsers: (req, res) => {
//         try {
//             const { user_id } = req.params;

//             res.json(user_id);
//         } catch (e) {
//             res.json({ message: e.message });
//         }
//     },

//     deleteUserById: (req, res) => {
//         const { user_id } = req.params;

//         res.json(user_id);
//     },

//     createUser: async (req, res, next) => {
//         try {
//             const user = await User.create(req.body);

//             res.status(201).json(user);
//         } catch (e) {
//             next(e);
//         }
//     },
// };
