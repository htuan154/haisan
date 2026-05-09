const { createSupabaseServiceClient, createSupabaseClient } = require('../utils/supabase');

function createResourceService(config) {
  if (!config?.table) {
    throw new Error('Resource config with table is required.');
  }

  let supabase;
  try {
    supabase = createSupabaseServiceClient();
  } catch {
    supabase = createSupabaseClient();
  }
  const tableName = config.table;

  return {
    async list({ page = 1, pageSize = 20, orderBy = 'created_at', orderDirection = 'desc' } = {}) {
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      const { data, error, count } = await supabase
        .from(tableName)
        .select('*', { count: 'exact' })
        .order(orderBy, { ascending: orderDirection === 'asc' })
        .range(from, to);

      if (error) {
        throw error;
      }

      return {
        data,
        pagination: {
          page,
          pageSize,
          total: count || 0,
        },
      };
    },

    async getById(id) {
      const { data, error } = await supabase.from(tableName).select('*').eq('id', id).single();

      if (error) {
        throw error;
      }

      return data;
    },

    async create(payload) {
      const { data, error } = await supabase.from(tableName).insert(payload).select('*').single();

      if (error) {
        throw error;
      }

      return data;
    },

    async update(id, payload) {
      const { data, error } = await supabase.from(tableName).update(payload).eq('id', id).select('*').single();

      if (error) {
        throw error;
      }

      return data;
    },

    async remove(id) {
      const { error } = await supabase.from(tableName).delete().eq('id', id);

      if (error) {
        throw error;
      }

      return { deleted: true, id };
    },
  };
}

module.exports = {
  createResourceService,
};
