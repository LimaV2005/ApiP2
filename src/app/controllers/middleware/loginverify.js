import jwt from 'jsonwebtoken';

async function loginverify(req, res, next) {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      console.log('não veio token');
      res.status(403).json({ message: "sem token" });
    } else {
        console.log('veio token');
      const [, token] = authorization.split(" ");
      jwt.verify(token, 'segredo');
      next();
    }
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      // Token inválido
      res.status(401).json({ message: "token inválido" });
    } else {
      // Outro erro inesperado
      res.status(500).json({ message: "Erro no servidor" });
    }
  }
}

export default loginverify;

