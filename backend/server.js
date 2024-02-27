const PORT = process.env.PORT ?? 8000
const express = require('express')
const { v4: uuidv4 } = require('uuid')
const cors = require('cors')
const app = express()
const pool = require('./database')
const admin = require('firebase-admin');

app.use(cors())
app.use(express.json())
admin.initializeApp();

app.get('/', (req, res) => {
    res.send('hello!')
})

// get lists
app.get('/lists/:userID', async (req, res) => {
    const { userID } = req.params
    try {
        const lists = await pool.query('SELECT * FROM lists WHERE owner_id = $1', [userID])
        res.json(lists.rows)
    } catch (error) {
        console.error('Error getting lists:', error);
    }
})

// get shared lists from user id
app.get('/shared_lists/:userID/lists', async (req, res) => {
    const { userID } = req.params
    try {
        const query = `
            SELECT lists.*
            FROM lists
            JOIN shared_lists ON lists.id = shared_lists.list_id
            WHERE shared_lists.user_id = $1
        `;

        const sharedLists = await pool.query(query, [userID])
        res.json(sharedLists.rows)
    } catch (error) {
        console.error('Error getting lists:', error);
    }
})

// get user ids from shared lists
app.get('/shared_lists/:listID/users', async (req, res) => {
    const { listID } = req.params
    try {
        const query = `
            SELECT users.*
            FROM users
            JOIN shared_lists ON users.id = shared_lists.user_id
            WHERE shared_lists.list_id = $1
        `;

        const sharedUsers = await pool.query(query, [listID])
        res.json(sharedUsers.rows)
    } catch (error) {
        console.error('Error getting users:', error);
    }
})

// share list
app.put('/lists/:listID/shared', async (req, res) => {
    const { listID } = req.params;
    const { shared } = req.body;
    try {
        const updateList = await pool.query('UPDATE lists SET shared = $1 WHERE id = $2', [shared, listID]);

        if (updateList.rowCount === 1) {
            res.json({ success: true, message: 'List shared status updated successfully'});
        } else {
            res.status(404).json({ success: false, message: 'List not found' });
        }
    } catch (error) {
        console.error('Error updating list shared status:', error);
        res.status(500).json({ sucess: false, message: 'Internal Server Error' });
    }
});

// add data to shared_lists
app.post('/shared_lists', async (req, res) => {
    const { list_id, user_id } = req.body;

    try {
        const newSharedList = await pool.query('INSERT INTO shared_lists(list_id, user_id) VALUES($1, $2)', [list_id, user_id]);
        res.json(newSharedList);
    } catch (error) {
        console.error('Error sharing list:', error)
        res.status(500).send('Internal Server Error');
    }
});

// get tasks
app.get('/tasks/:listID', async (req, res) => {
    const { listID } = req.params
    try {
        const tasks = await pool.query('SELECT * FROM tasks WHERE list_id = $1', [listID])
        res.json(tasks.rows)
    } catch (error) {
        console.error('Error getting tasks:', error);
    }
})

// create a new list
app.post('/lists', async (req, res) => {
    const { owner_id, title, shared, color } = req.body;
    const id = uuidv4();

    try {
        const newList = await pool.query('INSERT INTO lists(id, title, owner_id, shared, color) VALUES($1, $2, $3, $4, $5)', [id, title, owner_id, shared, color]);
        res.json(newList);
    } catch (error) {
        console.error('Error creating list:', error)
        res.status(500).send('Internal Server Error');
    }
});

// create a new task
app.post('/tasks', async (req, res) => {
    const { list_id, title, completed, creator_id } = req.body;
    const id = uuidv4();

    try {
        const newTask = await pool.query('INSERT INTO tasks(id, list_id, title, completed, creator_id) VALUES($1, $2, $3, $4, $5)', [id, list_id, title, completed, creator_id]);
        res.json(newTask);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).send('Internal Server Error');
    }
});

// edit a list
app.put('/lists/:id', async (req, res) => {
    const { id } = req.params;
    const { title, shared, color } = req.body

    try {
        const editList = await pool.query('UPDATE tasks SET title = $1, shared = $2, color = $3 WHERE id = $3;', [title, shared, color, id]);
        res.json(editTask);
    } catch(error) {
        console.error('Error editing list:', error);
        res.status(500).send('Internal Server Error');
    }
})

// edit a task
app.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { title, completed, last_edited_by } = req.body

    try {
        const editTask = await pool.query('UPDATE tasks SET title = $1, completed = $2, last_edited_by = $3 WHERE id = $4;', [title, completed, last_edited_by, id]);
        res.json(editTask);
    } catch(error) {
        console.error('Error editing task:', error);
        res.status(500).send('Internal Server Error');
    }
})

// edit a task completed variable
app.put('/tasks/:id/completed', async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body
    try {
        const editTask = await pool.query('UPDATE tasks SET completed = $1 WHERE id = $2;', [completed, id]);
        res.json(editTask);
    } catch(error) {
        console.error('Error editing task:', error);
        res.status(500).send('Internal Server Error');
    }
})

// delete a list
app.delete('/lists/:id', async(req, res) => {
    const { id } = req.params
    try {
        const deleteList = await pool.query('DELETE FROM lists WHERE id = $1;', [id]);
        res.json(deleteList)
    } catch (error) {
        console.error('Error deleting list:', error);
        res.status(500).send('Internal Server Error');
    }
});

// delete a task
app.delete('/tasks/:id', async(req, res) => {
    const { id } = req.params
    try {
        const deleteTask = await pool.query('DELETE FROM tasks WHERE id = $1;', [id]);
        res.json(deleteTask)
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).send('Internal Server Error');
    }
});

// signup
app.post('/signup', async(req, res) => {
    const { id, email, name } = req.body;

    try {
        const newUser = await pool.query('INSERT INTO users(id, email, name) VALUES($1, $2, $3)', [id, email, name]);
        res.json(newUser);
    } catch (error) {
        console.error('Error creating user:', error)
        res.status(500).send('Internal Server Error');
    }
});

// fetch user from id
app.get('/users/:userID', async (req, res) => {
    const { userID } = req.params;
    try {
        const user = await pool.query('SELECT * FROM users WHERE id = $1', [userID]);
        if (user.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user.rows[0]); // Return the first row
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// fetch user id from email
app.get('/users/email/:email', async (req, res) => {
    const { email } = req.params;
    try {
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user.rows[0]); // Return the first row
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))