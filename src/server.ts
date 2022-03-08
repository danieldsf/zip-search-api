import { app } from '@src/app';
import { PORT } from '@src/helpers/settings';

app.listen(PORT, () => console.log(`App running at: localhost:${PORT}`))