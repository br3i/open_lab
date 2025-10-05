const { execCentralizada, execCentralizadaProcedimientos } = require('./../config/execSQLCentralizada.helper');

const DashboardTotales = async () => {
    try {
        // Total de usuarios
        const sqlTotalUsuarios = `SELECT COUNT(*)::int as total_usuarios FROM usuario`;
        const totalUsuariosRes = await execCentralizada(sqlTotalUsuarios, 'OK', 'Sin usuarios');

        // Usuarios por rol (join perfil -> rol)
        const sqlUsuariosPorRol = `
      SELECT r.nombre as rol, COUNT(p.id_usuario)::int as cantidad
      FROM rol r
      LEFT JOIN perfil p ON p.id_rol = r.id AND p.estado = true
      GROUP BY r.nombre
      ORDER BY cantidad DESC
    `;
        const usuariosPorRolRes = await execCentralizada(sqlUsuariosPorRol, 'OK', 'Sin datos');

        // Personas por genero
        const sqlPersonasPorGenero = `
      SELECT COALESCE(genero, 'ND') as genero, COUNT(*)::int as cantidad
      FROM persona
      GROUP BY COALESCE(genero, 'ND')
      ORDER BY cantidad DESC
    `;
        const personasPorGeneroRes = await execCentralizada(sqlPersonasPorGenero, 'OK', 'Sin datos');

        // Perfiles activos
        const sqlPerfilesActivos = `SELECT COUNT(*)::int as total_perfiles_activos FROM perfil WHERE estado = true`;
        const perfilesActivosRes = await execCentralizada(sqlPerfilesActivos, 'OK', 'Sin datos');

        return {
            success: true,
            data: {
                totalUsuarios: totalUsuariosRes.data.length ? totalUsuariosRes.data[0].total_usuarios : 0,
                usuariosPorRol: usuariosPorRolRes.data || [],
                personasPorGenero: personasPorGeneroRes.data || [],
                totalPerfilesActivos: perfilesActivosRes.data.length ? perfilesActivosRes.data[0].total_perfiles_activos : 0
            }
        };
    } catch (err) {
        console.error('Error en DashboardTotales:', err);
        return { success: false, data: [], message: err.message };
    }
};

module.exports = { DashboardTotales };