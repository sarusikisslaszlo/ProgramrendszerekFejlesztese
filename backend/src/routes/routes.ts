import { Router, Request, Response, NextFunction } from 'express';
import { MainClass } from '../main-class';
import { PassportStatic } from 'passport';
import { User } from '../model/User';
import { FinancialGoal } from '../model/FinancialGoal';
import { SavingsGoal } from '../model/SavingsGoal';
import { ExpenseIncome } from '../model/IncomeExpense';
import { Message } from '../model/Message';

export const configureRoutes = (passport: PassportStatic, router: Router): Router => {

    router.get('/', (req: Request, res: Response) => {
        let myClass = new MainClass();
        res.status(200).send('Hello, World!');
    });

    router.get('/callback', (req: Request, res: Response) => {
        let myClass = new MainClass();
        myClass.monitoringCallback((error, result) => {
            if (error) {
                res.write(error);
                res.status(400).end();
            } else {
                res.write(result);
                res.status(200).end();
            }
        })
    });

    router.get('/promise', async (req: Request, res: Response) => {
        let myClass = new MainClass();

        try {
            const data = await myClass.monitoringPromise();
            res.write(data);
            res.status(200).end();
        } catch (error) {
            res.write(error);
            res.status(400).end();
        }
    });

    router.get('/observable', (req: Request, res: Response) => {
        let myClass = new MainClass();
        res.setHeader('Content-Type', 'text/html; charset=UTF-8');
        res.setHeader('Transfer-Encoding', 'chunked');

        myClass.monitoringObservable().subscribe({
            next(data: string) {
                res.write(data);
            }, error(error: string) {
                res.status(400).end(error);
            }, complete() {
                res.status(200).end();
            }
        });
    });

    router.post('/login', (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate('local', (error: string | null, user: typeof User) => {
            if (error) {
                console.log(error);
                res.status(500).send(error);
            } else {
                if (!user) {
                    res.status(400).send('User not found.');
                } else {
                    req.login(user, (err: string | null) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send('Internal server error.');
                        } else {
                            res.status(200).send(user);
                        }
                    })
                }
            }
        })(req, res, next);
    });

    router.post('/register', (req: Request, res: Response) => {
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;
        const address = req.body.address;
        const nickname = req.body.nickname;
        const user = new User({ email: email, password: password, name: name, address: address, nickname: nickname });
        user.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        })
    });

    router.post('/logout', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            req.logout((error) => {
                if (error) {
                    console.log(error);
                    res.status(500).send('Internal server error.');
                }
                res.status(200).send('Successfully logged out.');
            })
        } else {
            res.status(500).send('User is not logged in');
        }
    });

    router.get('/getAllUsers', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const query = User.find();
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.get('/getAllSavingsGoal', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const query = SavingsGoal.find();
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.get('/getAllFinancialGoal', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const query = FinancialGoal.find();
            query.then(data => {
                console.log(data);
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.get('/getAllExpenseIncome', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const query = ExpenseIncome.find();
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.get('/checkAuth', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            res.status(200).send(true);
        } else {
            res.status(500).send(false);
        }
    });

    router.post('/financial-goal/add', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const name = req.body.name;
            const amount = req.body.amount;
            const deadline = req.body.deadline;
            const user = req.user;
            const financialGoal = new FinancialGoal({ name: name, amount: amount, deadline: deadline, user: user });
            financialGoal.save().then(data => {
                res.status(200).send(data);
            }).catch(error => {
                res.status(500).send(error);
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.post('/savings-goal/add', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const name = req.body.name;
            const amount = req.body.amount;
            const deadline = req.body.deadline;
            const user = req.user;
            const savingsGoal = new SavingsGoal({ name: name, amount: amount, deadline: deadline, user: user });
            savingsGoal.save().then(data => {
                res.status(200).send(data);
            }).catch(error => {
                res.status(500).send(error);
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.post('/expense-income/add', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const name = req.body.name;
            const amount = req.body.amount;
            const deadline = req.body.deadline;
            const user = req.user;
            const financialGoal = req.body.financialGoal;
            const savingsGoal = req.body.savingsGoal;
            const type = req.body.type == "Bevétel" ? "INCOME" : "EXPENSE";
            const expenseIncome = new ExpenseIncome({ name: name, amount: amount, type: type, deadline: deadline, user: user, financialGoal: financialGoal, savingsGoal: savingsGoal });
            expenseIncome.save().then(data => {
                res.status(200).send(data);
            }).catch(error => {
                res.status(500).send(error);
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.delete('/deleteFinancialGoal', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const id = req.query.id;
            const query = FinancialGoal.deleteOne({ _id: id });
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.delete('/deleteSavingsGoal', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const id = req.query.id;
            const query = SavingsGoal.deleteOne({ _id: id });
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.delete('/deleteExpenseIncome', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const id = req.query.id;
            const query = ExpenseIncome.deleteOne({ _id: id });
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.post('/send-message', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const from = req.user;
            const to = req.body.to;
            const message = req.body.message;
            const messageObject = new Message({ from: from, to: to, message: message });
            messageObject.save().then(data => {
                res.status(200).send(data);
            }).catch(error => {
                res.status(500).send(error);
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });


    return router;
}