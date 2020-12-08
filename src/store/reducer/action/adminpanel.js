export const sort = (data, dev) => {
    const res = []

    dev.forEach((hw_1) => {
        let arr = [];
    
        data.forEach((hw_2) => {
          if (hw_1.variant === hw_2.variant) {
            arr.push(hw_2);
          }
        });
    
        res.push({
          variant: hw_1.variant,
          device: arr,
        });
      });

      function uniq(a) {
        var seen = {};
        return a.filter(function (item) {
          return seen.hasOwnProperty(item.variant)
            ? false
            : (seen[item.variant] = true);
        });
      }
    
      const result = uniq(res);

      return result
} 
